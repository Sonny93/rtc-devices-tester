export async function getPermissions(permissionName: string = '') {
  const permissions = await navigator.permissions.query({
    name: permissionName as PermissionName,
  });
  return permissions;
}
