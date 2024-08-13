import { StatisticCard } from '@ant-design/pro-components';

function Home() {
	return (
		<StatisticCard.Group>
			<StatisticCard
				statistic={{
					title: 'Total Projects',
					value: 10,
				}}
			/>

			<StatisticCard
				statistic={{
					title: 'Licences',
					value: 5,
					status: 'default',
				}}
			/>
			<StatisticCard
				statistic={{
					title: 'Customers',
					value: 3,
					status: 'processing',
				}}
			/>

		</StatisticCard.Group>
	)
}

export default Home