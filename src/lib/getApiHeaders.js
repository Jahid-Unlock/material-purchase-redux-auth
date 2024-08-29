
import { cookies } from 'next/headers';

function getApiHeaders() {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
}

export default getApiHeaders