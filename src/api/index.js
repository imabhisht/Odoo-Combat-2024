import { account } from "../appwrite";

const base_url = ""

export const createReports = async () => {
    try {
        const user = await account.get();
        if(user.status === 401){
            throw new Error('Unauthorized');
        }
        const jwt = await account.createJWT();
        const response = await fetch(`${base_url}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
        });
        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

export const getReports = async () => {
    try {
        const user = await account.get();
        if(user.status === 401){
            throw new Error('Unauthorized');
        }
        const jwt = await account.createJWT();
        const response = await fetch(`${base_url}/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': jwt,
            },
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}