//the point of this is action is to be called on the element that you want to listen to click outside of
export function clickOutside(node){

    addEventListener("click", handleClick);

    function handleClick(e){
        if(!node.contains(e.target)){
        node.dispatchEvent(new CustomEvent("outclick"))
        }   
    }
    return {
        destroy(){
            removeEventListener("click", handleClick);
        }
    }
}