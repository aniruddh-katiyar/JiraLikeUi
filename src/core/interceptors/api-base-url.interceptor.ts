import { HttpInterceptorFn } from "@angular/common/http";
import { environmement } from "../../environments/environment";

export const ApiBaseUrlInterceptor : HttpInterceptorFn = (req, next) =>
{
    if(req.url.startsWith('http'))
    {
        return next(req);
    }
    const updatedRequest = req.clone
        ({
            url : environmement.apiBaseUrl + req.url
        });
    return next(updatedRequest)
}

