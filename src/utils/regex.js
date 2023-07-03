export function buildRoutePath(path){
    const identifyParams = /:([a-zA-z]+)/g // procura onde tem : que indica que é query dinamico
    const pathWithParams = path.replaceAll(identifyParams, '(?<$1>[a-z0-9\-_]+)')
   
    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}