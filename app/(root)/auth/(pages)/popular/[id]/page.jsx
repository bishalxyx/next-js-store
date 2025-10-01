import { Moviepage } from "@/components/Application/MoviePage";
 const MoviePopular = async({params}) => {
    const {id}=await params;
    return(
        <Moviepage id={id}/>
    )
}
export default MoviePopular;
