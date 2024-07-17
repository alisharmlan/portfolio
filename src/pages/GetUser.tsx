import getDocuments from "@/firebase/firestore/getData";

export interface User {
    uuid: {
        stringValue: string;
    };
    name: {
        stringValue: string;
    };
    age: {
        integerValue: Number;
    };
    preferences?: {
        mapValue: {
        fields: {
            allergy: { stringValue: string };
            price: { stringValue: string };
            skincolor: { stringValue: string };
            skintone: { stringValue: string };
            skintype: { stringValue: string };
            undertone: { stringValue: string };
        };
        };
    };
    savedProducts?: {
        mapValue: {
            fields: {}
        }
    }
}

const fetchUser = async (userId: string | undefined | null): Promise<User | undefined> => {
    if (!userId) {
        return undefined; // Handle case where no user ID is provided
    }

    try {
        const { result, error } = await getDocuments("users");

        if (error) {
        throw error; // Rethrow the error for proper handling
        }

        if (!result || !result.docs.length) {
        return undefined; // Handle case where no users are found
        }

        const users = result.docs;
        for (const doc of users) {
            const user = doc._document.data.value.mapValue.fields;
            if (user && user.uuid?.stringValue === userId) {
                console.log("Fetched User:", user.name);
                return user; // Return the found user
            }
        }

        return undefined; // User not found
    } catch (error) {
        console.error("Error fetching user:", error);
        return undefined; // Indicate error occurred
    }
};

export default fetchUser;
