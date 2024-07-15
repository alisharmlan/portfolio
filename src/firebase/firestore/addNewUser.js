import addData from "@/firebase/firestore/addData";
export default async function addNewUser(data) {
    const handleNewUser = async (data) => {
        const { result, error } = await addData('users', data.uuid, data)
        
        if (error) {
            alert("Firestore error! Try again later.")
            return console.log(error)
        }

        await console.log(result)
    }

    await handleNewUser(data)
      
}