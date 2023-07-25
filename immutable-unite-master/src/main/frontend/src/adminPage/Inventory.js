import React ,{useState,useContext} from "react";
import styled, {css} from "styled-components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserContext } from "../context/UserInfo";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "./FireBase";
import AxiosFinal from "../api/AxiosFinal";




const Container=styled.div`
    width: 100%;
    height: 100%;
    height: calc(100vh - 180px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
        }
    .itemInfoTop{    
    width: 100%;
    height: 27px;
    display: flex;
    justify-content: space-evenly;
    align-items: center; 
    font-size: 11px;
    }

    .itemId{
        width: 50px;
        height: 15px;
        display: flex;
        justify-content: center; 
    }
    .itemNm{
        width: 430px;
        display: flex;
        justify-content: center;
            
    }
    .itemColor{
        width: 70px;
        display: flex;
        justify-content: center;
    }
    .itemSize{
        width: 30px;
        display: flex;
        justify-content: center;
    }
    .title-file{
        font-size:11px;
        ::file-selector-button {  
        width: 150px;
        height: 20px;
        background: #fff;
        border: 1px solid black;
        font-size: 11px;
        &:hover{
            background-color: black;
            color: white;
        } 
        }
    }
    .itemStock{
        width: 40px;
        display: flex;
        justify-content: center;
        input{
            border: none;
            font-size:11px;
            width: 30px;
            text-align: center;
        }
    }
        .itemSell{
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        select{
            font-size: 11px;
            border: none;
        }
    }
    .itemSubmit{
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .fixButton{ 
        border-right: none;
    }
    
    button{
        width: 100px;
        background-color: white;
        border: 1px solid black;
        font-size: 12px;
        &:hover{
            background-color: black;
            color: white;
        }
    }
`
const ItemInfoHead = styled.div`
    width: 100%;
    height: 27px;
    display: flex;
    justify-content: space-evenly;
    align-items: center; 
    font-size: 11px;
    border-bottom: 1px solid #ccc;

`
const ItemInfo=styled.div`
    width: 100%;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    .parentContents{
        width: 100%;
        height: 0px;
        overflow: hidden;
        transition: height 0.35s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;  
        ${props => props.active && css`   // *&* props가 active이면 css를 재정의 한다.
          height: 530px;
        `}     
    }
    .childContents{
        height: 500px;
        overflow-y: scroll;
        ::-webkit-scrollbar {
        display: none;
        }
    }
    .productImgArea{
        width:100%;
        height:220px;
        display:flex;
    }
    .partitionImg{
        display:flex;
        flex-direction:column;
        width:350px;
    }
    img{
        height:180px;
        width:200px;
    }
    .FixButton{
        height:20px;
        background-color:rgba(255,255,255,5);
    }
    .title-input{
        width: 100%;
        border: none;
        &:focus{
            outline: none;
        }
    }
    //에디터 넓이
    .ck.ck-editor{
        min-width: 100%;
    }
    //에디터 높이
    .ck.ck-editor__editable{
        height: 447px;
    }
    input{
      ::file-selector-button {  
      width: 100px;
      height: 20px;
      background: #fff;
      border: 1px solid black;
      font-size: 11px;
      &:hover{
        background-color: black;
        color: white;
      }
    }
    }  
    .popUpImage{
        position:absolute;
        width:80px;
        height:90px;        
    }
    .submit-button{
        width:100%;
        height:30px;
        border:1px solid black;
    } 
`

const  Inventory = () =>{
    //아이템 정보 얻기
    const context = useContext(UserContext);
    const {inventoryData} = context;
    //호버상태를 체크한다.
    const [onHover,setOnHover] = useState();
    //마우스를 올리면 해당 상품 이미지가 나타남.
    const onPopUpImage=(props)=>{
        console.log(props);
        setOnHover(props);
    }
    //마우스 떼면 이미지가 사라짐
    const onPopUpImageFalse=()=>{
        console.log();
        setOnHover();
    }
    //마우스 따라서 이미지가 움직임
    const [xy,setXY]=useState({x:0,y:0})
    const handleMouseMove=(e)=>{
        setXY({x:e.clientX,y:e.clientY});
    }
    //제목을 누르면 에디터가 넘어온다.
    //css에 active를 넘겨줄 값
    const[invenAccodian, setinvenAccodian] = useState("all"); 
    const onPopAccodian =(props)=>{
        // console.log(props);
        //같은 버튼 클릭시 null로 바꿔주어 모든 css를 초기화한다
        if(props===invenAccodian){
            setinvenAccodian(null);
            // console.log(qnaAccodian);
        }else{
            setinvenAccodian(props);
        }        
    };
    //이미지를 추출할 데이터
    const [prodDetailImg, setProdDetailImg] = useState();
    const customUploadAdapter = (loader) => {
        return {
          upload() {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              loader.file.then((file) => {
                formData.append("file", file);
                  const storageRef = ref(storage, `uploadimg/${file.name}`);
                  const uploadTask = uploadBytes(storageRef, file);
                  uploadTask.then((snapshot) =>{
                    getDownloadURL(snapshot.ref).then((downloadURL) =>{
                      console.log("File avalable at",downloadURL);
                      setProdDetailImg(downloadURL);
                      alert("이미지 업로드가 완료 되었습니다. 기존 내용을 지워주세요.")
                    })
                  })
              });
            });
          },
        };
      };
    //ck에디터 이미지 업로드
    function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
        };
    }
    //수정할 아이템의 정보
    const [fixProductData, setFixProductData] = useState({
        productSellStatus:'',
        itemStock:'',
        productName:''
        });
    //바뀔 값들이 props로 들어와 저장 됨
    const getValue = (e) => {
        const { name } = e.target;
        setFixProductData({
            ...fixProductData,
            //name 키를 가진 값을 value로 설정
            [name]: e.target.value
        })
    }
    //이미지 수정
    //이미지 수정URL을 받을 값
    const [imageURLFst,setImageURLFst] = useState();
    //URL을 추출할 컴포넌트
    const onSelectFileFst = (e) => {
        e.preventDefault();
        e.persist();
        //선택한 파일
        const image = e.target.files;
        console.log(image);
        if(!image) return null;
        const storageRef = ref(storage, `uploadimg/${image[0].name}`);
        const uploadTask = uploadBytes(storageRef, image[0]);
        uploadTask.then((snapshot) =>{
        getDownloadURL(snapshot.ref).then((downloadURL) =>{
            console.log("File avalable at",downloadURL);
            alert("이미지 업로드가 완료되었습니다.")
            setImageURLFst(downloadURL);            
        })
        })
    };
    //이미지 수정URL을 받을 값
    const [imageURLSnd,setImageURLSnd] = useState();
    //URL을 추출할 컴포넌트
    const onSelectFileSnd = (e) => {
        e.preventDefault();
        e.persist();
        //선택한 파일
        const image = e.target.files;
        if(!image) return null;
        const storageRef = ref(storage, `uploadimg/${image[0].name}`);
        const uploadTask = uploadBytes(storageRef, image[0]);
        uploadTask.then((snapshot) =>{
        getDownloadURL(snapshot.ref).then((downloadURL) =>{
            console.log("File avalable at",downloadURL);
            alert("이미지 업로드가 완료되었습니다.")
            setImageURLSnd(downloadURL);
        })
        })
    };    
    //이미지는 바로 수정 할 수 있도록 한다. 각각 첫번째 이미지 두번째 이미지
    const onChangeImgFst = async(id)=>{     
        console.log(imageURLFst);  
        const response = await AxiosFinal.productChangeImgFst(id,imageURLFst)
    }
    const onChangeImgSnd = async(id)=>{
        console.log(imageURLSnd)
        const response = await AxiosFinal.productChangeImgSnd(id,imageURLSnd)
    }
    //수정버튼
    const onFixInventory =(productData)=>{  
        console.log(productData);
        if(fixProductData.productName==='' && fixProductData.productSellStatus==''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName,
                productSellStatus: productData.productSellStatus
              })
        }else if(fixProductData.productName==='' && fixProductData.itemStock==''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName,
                itemStock: productData.productStock
              })
        }else if(fixProductData.productName===''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName
              })
        }
        else if(fixProductData.itemStock===''){
            setFixProductData({
                ...fixProductData,
                itemStock: productData.productStock
              })
        }
        console.log(fixProductData);    
    }
    //contents수정버튼
    const onChangeContents=async(id,productContent)=>{
        if(fixProductData.content===''){
            setFixProductData({
                content:productContent
            })}
        const response = await AxiosFinal.productChangeImgDetail(id,fixProductData.content,prodDetailImg)
    }
    //submit버튼
    const submitProduct=async(id,productData)=>{
        if(fixProductData.productName==='' && fixProductData.productSellStatus==''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName,
                productSellStatus: productData.productSellStatus
              })
        }else if(fixProductData.productName==='' && fixProductData.itemStock==''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName,
                itemStock: productData.itemStock
              })
        }else if(fixProductData.productName===''){
            setFixProductData({
                ...fixProductData,
                productName: productData.productName
              })
        }        
        const response = await AxiosFinal.productChangeData(
            id,fixProductData.itemStock,fixProductData.productSellStatus,fixProductData.productName)
    }


    return(
        <Container>
           <ItemInfoHead>
               <div className="itemId">ID</div>
               <div className="itemNm">NAME</div>
               <div className="itemColor">COLOR</div>
               <div className="itemSize">SIZE</div>  
               <div className="itemStock">STOCK</div>
               <div className="itemSell">STATUS</div>
               <div className="itemSubmit"></div>    
           </ItemInfoHead>
           {inventoryData && inventoryData.map((i)=> 
           <ItemInfo key={i.productId} active={invenAccodian === i.productId}>
            <div className="itemInfoTop">
                <div onMouseMove={(e)=>handleMouseMove(e)}>
                <div className="itemId" onMouseOver={()=>onPopUpImage(i.productId)} onMouseLeave={()=>onPopUpImageFalse()}>
                    {i.productId}
                     {onHover ===i.productId && <img src={i.productImgFst} className="popUpImage" style={{left:xy.x,top:xy.y}}/>}
                </div>
               </div>
                <div className="itemNm"  onClick={()=>{onPopAccodian(i.productId)}}>                      
                    {i.productName} 
                </div>               
               <div className="itemColor">
               {i.productColor}
               </div>
               <div className="itemSize">
               {i.productSize}
               </div>  
               <div className="itemStock">                   
                <input type="text" className="stockInput" value={i.productStock}/>
                <input type="text" className="stockInput" placeholder="수정" onChange={(e)=>{getValue(e)}} name='itemStock'/>
               </div>
               <div className="itemSell">                
                <select name ='productSellStatus' onChange={getValue}>
                    <option value=""selected>{i.productSellStatus}</option>
                    <option value="SELL">sell</option>
                    <option value="HOLD">hold</option>
                    <option value="SOLD_OUT">sold_out</option>
                </select>
               </div> 
               <div className="itemSubmit">
                <button className="fixButton" onClick={()=>{onFixInventory(i)}}>fix</button>
                <button onClick={()=>submitProduct(i.productId,i)}>submit</button>
               </div>
            </div>
            <div className="parentContents" >
                <div className="childContents">
                    <div className="productImgArea">
                        <div className="partitionImg">
                            <img src={i.productImgFst}/>
                            <input className="title-file2" type='file' onChange={(e)=>{onSelectFileFst(e)}}/>
                            <button onClick={(e)=>{onChangeImgFst(i.productId)}}>fix</button>
                        </div>
                        <div className="partitionImg">
                            <img src={i.productImgSnd}/>                          
                            <input className="title-file2" type='file' onChange={(e)=>{onSelectFileSnd(e)}}/>
                            <button onClick={(e)=>{onChangeImgSnd(i.productId)}}>fix</button>
                        </div>
                    </div>
                    <input className="title-input" type='text' placeholder='pleace enter fix name' name='productName' onChange={getValue}/>
                        <CKEditor className="info-input"
                            editor={ClassicEditor}
                            config={{
                                extraPlugins: [uploadPlugin]          
                            }}
                            data={"상세페이지: <br><br>"+ i.productImgDetail + "<br><br>상세 설명 : "+ i.productContent}
                            onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data,});
                            setFixProductData({
                                ...fixProductData,
                                content: data
                            })
                            console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                            }}
                        />                        
                </div>  
                <button className="submit-button" onClick={()=>onChangeContents(i.productId,i.productContent)}>Contents upload</button> 
            </div>
           </ItemInfo>)}
        </Container>
    );
};

export default Inventory;