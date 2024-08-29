import getApiHeaders from "@/lib/getApiHeaders"

export default async function Home() {

  let data = await fetch('https://devapi.propsoft.ai/api/auth/interview/material-purchase', {
    headers: getApiHeaders()
  })
  let { material_purchase_list } = await data.json();

  console.log(material_purchase_list.data);

  return (
    <main className="flex justify-center items-center flex-col">
        {material_purchase_list.data.map((item : any)=> (
          <div key={item.key}>
              {item.line_item_name}
          </div>
        ))}
    </main>
  );
}
