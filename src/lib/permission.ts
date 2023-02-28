export async function getPermissions(permissionName = "") {
  const permissions = await navigator.permissions.query({
    // @ts-ignore
    name: permissionName,
  });
  return permissions;
}
