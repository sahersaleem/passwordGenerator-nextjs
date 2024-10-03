
'use client'

import React, { ChangeEvent, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";


const PasswordGenerator = () => {


const [length , setLength] = useState<number>(16)
const [uppercase , setUppercase] = useState<boolean>(true)
const [lowercase , setLowercase] = useState(true)
const [symbol , setSymbol] = useState<boolean>(true)
const [numbers , setNumbers] = useState<boolean>(true)
const [password, setPassword] = useState<string>(" ")

const handleLengthChange = (e:ChangeEvent<HTMLInputElement>)=>{
  setLength(Number(e.target.value))
}


const generatePassword = (): void => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";


let allchars = ""

if(uppercase) allchars+=uppercaseChars
if(lowercase) allchars +=lowercaseChars
if(numbers) allchars+=numberChars
if(symbol)allchars+=symbolChars

if(allchars===""){
  alert("Please select atleast one character!")
  return;
}

let generatePassword = ""


for (let i = 0 ; i<length ; i++){
  const randomIndex = Math.floor(Math.random()*allchars.length)
  generatePassword += allchars[randomIndex]
  
}

setPassword(generatePassword)
}

const copyToClipboard = ()=>{
  navigator.clipboard.writeText('password').then(()=>{
    alert("Password copied to clipboard")
  },
  (err)=>{
    alert("Failed to copy password to clipboard. ")
    console.log(err)
  }

)
  
}


const handleCheckBoxChange = (setter:(value:boolean)=>void)=>
  (checked:CheckedState):void=>{
  if(typeof checked==="boolean"){
   setter(checked)
  }}
  

  return (
    <div className="w-[550px] h-[600px] bg-white p-14 rounded-xl">
      <div className="text-black flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold text-center">Password Generator</h1>
          <p className="text-xl font-medium text-center text-wrap">
            Create a secure password with just a few clicks.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password-length" className="text-xl font-medium">
            Password length
          </label>
          <Input
            type="number"
            id="password-length"
            min={8}
            max={32}
            className="p-2 rounded-xl"
            value={length}
            onChange={handleLengthChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xl">Include:</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="uppercase" checked={uppercase} onCheckedChange={handleCheckBoxChange(setUppercase)}/>
            <label htmlFor="uppercase">Uppercase</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lowercase" onCheckedChange={handleCheckBoxChange(setLowercase)}/>
            <label htmlFor="lowercase">Lowercase</label>
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox id="numbers" onCheckedChange={handleCheckBoxChange(setNumbers)}/>

            <label htmlFor="numbers">numbers</label>
          </div>
          <div className="flex items-center space-x-2">
          <Checkbox id="symbols" onCheckedChange={handleCheckBoxChange(setSymbol)}/>
           
            <label htmlFor="Symbols">Symbols</label>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button type="button" onClick={generatePassword}>Generate Password</Button>
        </div>
        <div className="flex justify-center items-center flex-col">
          
          <div className="flex space-x-4">
            <Input type="string" value={password}  readOnly className="text-black" />

            <Button onClick={copyToClipboard}>Copy to clipboard</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PasswordGenerator;
