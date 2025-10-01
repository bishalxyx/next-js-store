import { Moviepage } from "@/components/Application/MoviePage";
 const MovieUpcoming = async({params}) => {
    const {id}=await params;
    return(
        <Moviepage id={id}/>
    )
}
export default MovieUpcoming;
