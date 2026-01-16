import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment";

export const ApiBaseUrlInterceptor : HttpInterceptorFn = (req, next) =>
{
    if(req.url.startsWith('http'))
    {
        return next(req);
    }
    const updatedRequest = req.clone
        ({
            url : environment.apiBaseUrl + req.url
        });
    return next(updatedRequest)
}

