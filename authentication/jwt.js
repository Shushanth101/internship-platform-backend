import jwt from 'jsonwebtoken'

const pvt_key = "jumbo@56"

const payload ={
    test:"backend-serivce-test"
}


const createToken = ()=>{

    const token = jwt.sign(payload,pvt_key)
    console.log(token)
    return token


}


const verifyToken = (token)=>{

    let isValidToken = false

    try {
        isValidToken = jwt.verify(token,pvt_key)
        return isValidToken
    } catch (error) {
        console.log(error)
    }
    


}

createToken()

export {
    createToken,
    verifyToken
}