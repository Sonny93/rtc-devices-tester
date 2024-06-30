import styled from '@emotion/styled';
import Legend from '~/components/common/legend';
import { capitalize } from '~/lib/string';

const Emoji = styled.span({
  fontSize: '20px',
});

const PermissionGranted = styled(Legend)(({ theme }) => ({
  color: theme.colors.green.default,
}));

const PermissionDenied = styled(Legend)(({ theme }) => ({
  color: theme.colors.red.default,
}));

const DisplayPermissionStatus = ({
  state,
  permissionName,
}: {
  state: PermissionStatus['state'];
  permissionName: string;
}) =>
  state === 'prompt' ? (
    <Legend>
      <Emoji>🤔</Emoji>
      Waiting for {permissionName} permission
    </Legend>
  ) : state === 'granted' ? (
    <PermissionGranted>
      <Emoji>😊</Emoji>
      {capitalize(permissionName)} permission granted
    </PermissionGranted>
  ) : (
    <PermissionDenied>
      <Emoji>🥺</Emoji>
      {capitalize(permissionName)} permission denied, we're not able to access
      to your device...
    </PermissionDenied>
  );

export default DisplayPermissionStatus;
