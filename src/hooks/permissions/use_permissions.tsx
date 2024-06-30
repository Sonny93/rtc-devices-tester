import { useEffect, useState } from 'react';
import { getPermissions } from '~/lib/permission';

export default function usePermissions(permissionName: string) {
  const [permissionState, setPermissionState] = useState<
    PermissionStatus['state'] | undefined
  >(undefined);

  const permission =
    permissionName === 'speaker'
      ? 'microphone'
      : permissionName === 'video'
        ? 'camera'
        : permissionName;
  useEffect(() => {
    getPermissions(permission!.toLowerCase()).then((query) => {
      setPermissionState(query.state);
      query.addEventListener('change', () => setPermissionState(query.state));
    });
  });

  return permissionState;
}
