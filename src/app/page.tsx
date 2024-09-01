import getApiHeaders from "@/lib/getApiHeaders"
import Header from "@/components/Header"
import MaterialList from "@/components/MaterialList"
export default async function Home() {

  let data = await fetch('https://devapi.propsoft.ai/api/auth/interview/material-purchase', {
    headers: getApiHeaders()
  })
  let { material_purchase_list } = await data.json();

  // console.log(material_purchase_list.data);

  return (
    <main className="">
      <Header/>
      <MaterialList list={material_purchase_list}/>
    </main>
  );
}
