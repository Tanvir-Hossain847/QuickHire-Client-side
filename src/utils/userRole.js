/**
 * Fetch user role from backend API
 * @param {string} uid - Firebase user ID
 * @returns {Promise<string>} - User role ('user' or 'admin')
 */
export async function getUserRole(uid) {
  try {
    const response = await fetch(`http://localhost:4000/users/${uid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user role');
    }
    const userData = await response.json();
    return userData.role || 'user';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'user'; // Default to user role on error
  }
}

/**
 * Check if user is an admin
 * @param {string} uid - Firebase user ID
 * @returns {Promise<boolean>} - True if user is admin
 */
export async function isAdmin(uid) {
  const role = await getUserRole(uid);
  return role === 'admin';
}
