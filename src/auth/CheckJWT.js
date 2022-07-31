import {expressjwt} from "express-jwt";
import jwksRsa from "jwks-rsa";
import authConfig from "./auth_config.json" assert {type: "json"}

export default expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"],
});