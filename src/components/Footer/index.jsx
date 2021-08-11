import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'gcom.copyright',
    defaultMessage: 'GCOM Technologies',
  });
  return <DefaultFooter copyright={`2020 ${defaultMessage}`} links={[]} />;
};
