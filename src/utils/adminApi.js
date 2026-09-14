/**
 * Centrale fetch-helper voor de admin: voegt automatisch de JWT toe en
 * vangt verlopen sessies (401) op één plek af — de gebruiker wordt dan
 * netjes naar de login gestuurd met een "sessie verlopen" melding.
 */
export async function adminFetch(url, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin/login?expired=1';
    throw new Error('Je sessie is verlopen. Log opnieuw in.');
  }

  return response;
}
