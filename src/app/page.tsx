import getApiHeaders from "@/lib/getApiHeaders"
import Header from "@/components/Header"
import MaterialList from "@/components/MaterialList";
import AddMaterial from "@/components/AddMaterial";


export default async function Home() {

  let data = await fetch('https://devapi.propsoft.ai/api/auth/interview/material-purchase', {
    headers: getApiHeaders()
  })
  let { material_purchase_list } = await data.json();

  // console.log(material_purchase_list.data);

  return (
    <main className="">
      <Header/>
      <AddMaterial/>
      <MaterialList list={material_purchase_list}/>
    </main>
  );
}
