import { FsContext } from '@/comps/cont/fsCont';
import Layout from '@/comps/layout'
// import Poster from '@/comps/poster'
import { awsAPI } from '@/utils/api';
// import { client } from '@/utils/aws';
// import { CompareFacesCommand } from '@aws-sdk/client-rekognition';
import moment from 'moment';
import Head from 'next/head'
import { useContext, useState , useEffect, useRef} from 'react'
import Webcam from "react-webcam";  

export default function Home() {

  const [data , setData] = useState<any | null>(null); 
  // const [img , setImg] = useState<any | null>(null);
  const fsCont = useContext(FsContext); 

  // const webcam = useRef<Webcam>(null);

  const followIt = async({id , followId}: any) => {
      await awsAPI.post('users/track' , {
          userId: id, 
          followId: followId, 
          state: 'follow'
      }).then(res => console.log(res));  
  }; 
  // const capture = () => {setImg(Buffer.from((webcam?.current?.getScreenshot() as string).replace(/^data:image\/\w+;base64,/, ''), 'base64'))}; 

  // const compareIt = async () => {
  //   try {
  //       const params = {
  //         SourceImage: {
  //           Bytes: img
  //          },
  //         TargetImage: {
  //           S3Object: {
  //            Bucket: 'fs-bucket01',
  //            Name: 'face.jpeg'
  //         }
  //        },
  //       };
  //        const result = await client.send(new CompareFacesCommand(params)); 
  //        setData(result?.FaceMatches);
  //        } catch(err) {
  //         console.log(err); 
  //        };
  //     }; 

  useEffect(() => {
    fsCont?.onStateChanged(); 
    awsAPI.get(`users/get/${fsCont?.usr?.pool_name?.S}`).then((res) => {
        setData(res?.data);  
    })  
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
        <div className='flex flex-col w-full justify-center items-center mt-10'> 
        <div>{fsCont?.st}</div>
        <div>Follow these users.</div>
        <div className='flex flex-col justify-center items-center'>
            {data != null && data?.length != 0 ? data.map((x: any , i: number) => {
               return <div key={i}>
                   UserName: {x?.userName?.S}
                   <img src={x?.pic?.S} width={50} height={50}/>
                   <div>ID: {x?.id?.S}</div>
                   <button onClick={() => followIt({id: x?.id?.S , followId: fsCont?.usr?.id.S})}>Follow</button>
               </div>
            }): <div>Awaiting</div>}
        </div>
        </div>
      </Layout>
    </>
  )
}
