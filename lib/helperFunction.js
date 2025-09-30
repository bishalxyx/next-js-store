import { NextResponse } from "next/server"
import { success } from "zod";

export const response=(success,statusCode,message,data={})=>{
    return NextResponse.json({
        success,statusCode,message,data
    })
}

export const catchError=(error,customMessage)=>{
    if(error.code===11000){
        const keys=Object.keys(error.keyPattern).join(',');
        error.message=`Duplicate fields:${keys}.These fields value must be unique.`
    }

    let errorobj={}

    if(process.env.NODE_ENV==='development'){
        errorobj={
            message:error.message,
            error
        }

    }
    else{
        errorobj={
            message:customMessage||'Internal server error'
        }
    }
    return  NextResponse.json({
        success:false,
        statusCode:error.code,
        ...errorobj
    })


}

export const generateOTP=()=>{
    const otp=Math.floor(100000+Math.random()*900000).toString();
    return otp;
}