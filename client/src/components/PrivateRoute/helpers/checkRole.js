/**
 *
 * @param {string} userRole
 * @param {Array | object} rolesPermissions
 * @returns {boolean}
 */
function checkRole(userRole, rolesPermissions) {
  if (Array.isArray(rolesPermissions)) {
    return rolesPermissions.includes(userRole);
  }
  if ('include' in rolesPermissions) {
    return rolesPermissions['include'].includes(userRole);
  }
  if ('exclude' in rolesPermissions) {
    return !rolesPermissions['exclude'].includes(userRole);
  }
  return false;
}

export default checkRole;
