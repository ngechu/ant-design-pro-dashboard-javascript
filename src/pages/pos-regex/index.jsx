import React, { useState, useEffect } from 'react';
import { Trie } from 'regexgen';
import Papa from 'papaparse';
import { Upload, Button, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CopyFilled, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { ProTable } from '@ant-design/pro-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function SerialNumberValidator() {
	const [serialNumbers, setSerialNumbers] = useState([]);
	const [regexPattern, setRegexPattern] = useState(null);
	const [results, setResults] = useState([]);
	const [summary, setSummary] = useState('');
	const [fileList, setFileList] = useState([]);

	useEffect(() => {
		if (serialNumbers.length > 0) {
			generateRegexPattern();
		}
	}, [serialNumbers]);

	const readFile = (file) => {
		console.log(file);
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = e.target.result;
			if (file.name.endsWith('.csv')) {
				processCSV(data);
			} else if (
				file.name.endsWith('.xlsx') ||
				file.name.endsWith('.xls') ||
				file.name.endsWith('.XLSX')
			) {
				processExcel(data);
			} else {
				message.error('Unsupported file type. Please upload a CSV or Excel file.');
			}
		};
		reader.onerror = (error) => {
			message.error('File reading failed: ' + error);
		};

		if (file.name.endsWith('.csv')) {
			reader.readAsText(file);
		} else {
			reader.readAsArrayBuffer(file);
		}
	};

	const processCSV = (data) => {
		Papa.parse(data, {
			complete: (results) => {
				processData(results.data);
			},
			header: true,
			error: (error) => {
				message.error('CSV parsing failed: ' + error);
			},
		});
	};

	const processExcel = (data) => {
		try {
			const workbook = XLSX.read(data, { type: 'array' });
			const firstSheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[firstSheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet);
			processData(jsonData);
		} catch (error) {
			message.error('Excel parsing failed: ' + error);
		}
	};

	const processData = (data) => {
		const numbers = data.filter((row) => row['N°S Terminal']).map((row) => row['N°S Terminal']);
		if (numbers.length === 0) {
			message.warning(
				'No serial numbers found in the file. Make sure the column is named "N°S Terminal".',
			);
		} else {
			setSerialNumbers(...serialNumbers, numbers);
			message.success(`${numbers.length} serial numbers loaded successfully.`);
		}
	};

	const generateRegexPattern = () => {
		const t = new Trie();
		const values = [...serialNumbers];
		console.log('processexcel', serialNumbers);
		values.forEach((serial) => t.add(serial));
		const pattern = t.toRegExp();
		setRegexPattern(pattern);
		validateSerialNumbers(pattern);
	};

	const validateSerialNumbers = (pattern) => {
		const testNumbers = [...serialNumbers];
		let passCount = 0;
		const newResults = testNumbers.map((serial) => {
			const isValid = pattern.test(serial);
			if (isValid) passCount++;
			return { serial, isValid };
		});
		setResults(newResults);
		setSummary(`${passCount}/${testNumbers.length} pass`);
	};

	const handleUpload = (info) => {
		if (info) {
			readFile(info.fileList[0].originFileObj);
		}
	};

	const uploadProps = {
		showUploadList: false,
		onRemove: (file) => {
			const index = fileList.indexOf(file);
			const newFileList = fileList.slice();
			newFileList.splice(index, 1);
			setFileList(newFileList);
		},
		beforeUpload: (file) => {
			setFileList([file]);
			return false;
		},
		fileList,
	};

	return (
		<div>
			<ProTable
				type="table"
				pagination
				rowKey="serial"
				search={false}
				toolBarRender={() => [
					<Upload {...uploadProps} onChange={handleUpload}>
						<Button disabled={serialNumbers.length > 0 ? true : false} icon={<UploadOutlined />}>Select CSV or Excel File</Button>
					</Upload>,
					<Button disabled={serialNumbers.length > 0 ? false : true} onClick={() => {
						setSerialNumbers([])
						setResults([])
					}}>Clear</Button>,
					<CopyToClipboard text={regexPattern} onCopy={() => {
						message.success('Copied successfully')
					}}>
						<Button disabled={regexPattern ? false : true} type='primary'>
							Copy Regex <CopyFilled />
						</Button>
					</CopyToClipboard>,


				]}
				loading={!results}

				columns={[
					{ dataIndex: 'serial', title: 'Serial Number', key: 'serial', align: "center" },
					{
						dataIndex: 'isValue',
						title: 'Successfull',
						render: (_, record) => {
							return record?.isValid ? <CheckCircleOutlined style={{ fontSize: 20, color: "green" }} /> : <CloseCircleOutlined style={{ fontSize: 20, color: "red" }} />;
						},
						align: "center"
					},
				]}
				dataSource={results}
			/>

		</div>
	);
}

export default SerialNumberValidator;
