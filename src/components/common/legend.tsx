import styled from '@emotion/styled';

const Legend = styled.p<{ center?: boolean }>(({ theme, center }) => ({
  width: '100%',
  textAlign: center ? 'center' : 'unset',
  fontSize: theme.fontSizes.m,
  color: theme.colors.grey.light,
  marginTop: '.25em',
}));

export default Legend;
