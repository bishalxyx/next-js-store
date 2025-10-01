import { Moviepage } from "@/components/Application/MoviePage";
 const Moviepage1 = async({params}) => {
    const {id}=await params;
    return(
        <Moviepage id={id}/>
    )
}
export default Moviepage1;
