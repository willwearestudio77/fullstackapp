export const sendMail = async(vals) =>{
    console.log(vals);
    try{
        const response = await fetch ("/api/contact",{
            method:"POST",
            headers:{
                "Content-type":'application/json; charset="UTF-8"',
            },
            body:JSON.stringify(vals),
        });
        if (!response.ok) throw response;
        console.log(`Email sent`);
    }catch (err){
        console.log(err);
    }
} 