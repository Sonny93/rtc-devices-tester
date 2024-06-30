import styled from '@emotion/styled';

const Legend = styled.p(({ theme }) => ({
  width: '100%',
  fontSize: theme.fontSizes.m,
  color: theme.colors.grey.light,
  marginTop: '.25em',
}));

export default Legend;
