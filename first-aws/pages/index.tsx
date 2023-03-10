import { FsContext } from '@/comps/cont/fsCont';
import Layout from '@/comps/layout'
import Poster from '@/comps/poster'
import { awsAPI } from '@/utils/api';
import { client } from '@/utils/aws';
import { CompareFacesCommand } from '@aws-sdk/client-rekognition';
import moment from 'moment';
import Head from 'next/head'
import { useContext, useState , useEffect, useRef} from 'react'
import Webcam from "react-webcam";  

export default function Home() {

  const [data , setData] = useState<any | null>(null); 
  const [img , setImg] = useState<any | null>(null);
  const fsCont = useContext(FsContext); 

  const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
  };

  const webcam = useRef<Webcam>(null);
  const capture = () => {setImg(Buffer.from((webcam?.current?.getScreenshot() as string).replace(/^data:image\/\w+;base64,/, ''), 'base64'))}; 

  const compareIt = async () => {
    try {
        const params = {
          SourceImage: {
            Bytes: img
           },
          TargetImage: {
            S3Object: {
             Bucket: 'fs-bucket01',
             Name: 'face.jpeg'
          }
         },
        };
         const result = await client.send(new CompareFacesCommand(params)); 
         setData(result?.FaceMatches);
         } catch(err) {
          console.log(err); 
         };
      }; 

  useEffect(() => {
    fsCont?.onStateChanged(); 
    awsAPI.get('posts').then((res) => setData(res)); 
  }, [fsCont]) 

  return (
    <>
      <Head>
        <title>Instagram</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/insta.ico" />
      </Head>
      <Layout>
        <div>{fsCont?.st}</div>
        <button onClick={() => fsCont?.signOut()}>Sign out</button>
        <Webcam audio={false} ref={webcam} videoConstraints={videoConstraints} screenshotFormat="image/jpeg" /> 
        <button onClick={capture}>Capture photo</button>
        <button onClick={compareIt}>Compare face.</button>
        <div>Comments: {data != null ? data?.data[0]?.comments?.L.map((x: any, i: number) => {
           return <div key={i}>content: {x?.M?.cmt?.S} , when: {moment(x?.M?.when?.S).format('lll')}</div>
        }) : ''}</div>
      </Layout>
    </>
  )
}
