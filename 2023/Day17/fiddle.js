function main(){



    foo(5,6,7);
console.log("________________")
    let q =[];
    q.push([5,6,7])
    while(q.length){
        console.log({q})
        let [a,b,c]=q.pop();
        if (a <= 0){
            continue;
        }
       
        q.push([a-1,b,c])
        q.push([a-2,b-1,c])
    }
}



function foo(a,b,c){

    if (a<=0){
        return;
    }
    console.log({a,b,c})
    foo(a-1,b,c);
    foo(a-2,b-1,c)
}



main();