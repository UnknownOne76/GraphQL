import { FsContext } from '@/comps/cont/fsCont';
import Layout from '@/comps/layout'
import Poster from '@/comps/poster'
import { RekognitionClient , CompareFacesCommand } from '@aws-sdk/client-rekognition';
import Head from 'next/head'
import { useContext, useState , useEffect, useRef} from 'react'
import Webcam from "react-webcam";
const client = new RekognitionClient({region: 'ap-northeast-2', credentials: {accessKeyId: '', secretAccessKey: ''}});  

export default function Home() {

  const [data , setData] = useState<any | null>(null); 
  const [img , setImg] = useState<any | null>(null);
  const fsCont = useContext(FsContext);

  useEffect(() => {
      console.log(img); 
  }, [img]);

  const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
  };

  const webcam = useRef<Webcam>(null);
  const capture = () => {setImg(Buffer.from((webcam?.current?.getScreenshot() as string).replace(/^data:image\/\w+;base64,/, ''), 'base64'))}; 

  const compareIt = async () => {
    console.log(img); 
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
      return console.log(result?.FaceMatches);
    } catch(err) {
       console.log(err); 
    }; 
  }; 

  useEffect(() => {
    fsCont?.onStateChanged(); 
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
        <Webcam audio={false} ref={webcam} videoConstraints={videoConstraints}/>
        <button onClick={capture}>Capture photo</button>
        <button onClick={compareIt}>Compare face.</button>
      </Layout>
    </>
  )
}
