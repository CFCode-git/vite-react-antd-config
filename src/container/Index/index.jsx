import React,{useEffect} from 'react'
import {Button} from 'antd'
import {get} from '../../utils'


export default function Index(){
  console.log('import.meta.env',import.meta.env)
  useEffect(()=>{
    get('/index-infos').then((data)=>{
      console.log(data)
    })
  },[])
  return <div>
    <Button type="primary">index</Button>
  </div>
}
