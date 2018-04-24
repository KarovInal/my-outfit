import { toString } from 'lodash';

const formatMoney = money => toString(money).replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')

export default formatMoney;
