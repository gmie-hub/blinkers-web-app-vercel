import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import BackIcon from "../../assets/back.svg";
import ArrowSide from "../../assets/arrow-left.svg";
import { routeParts } from "../../routes";
import { routesArrayAtom } from "../../utils/store.tsx";
import { useSetAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import classNames from "classnames";
import { Route } from "../../utils/type";

interface RouteIndicatorProps {
  showBack?: boolean;
  show?: boolean;
}

export default function RouteIndicator({
  showBack = false,
  show = true,
}: Readonly<RouteIndicatorProps>) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routeArray: Route[] = useAtomValue(routesArrayAtom) || ([] as Route[]);
  const setRouteArray = useSetAtom(routesArrayAtom);

  useEffect(() => {
    const resolvedPathname = routeParts[pathname]
      ? pathname
      : `${pathname?.substring(0, pathname?.lastIndexOf("/"))}/:id`;
    const resolvedRoutes = routeParts[resolvedPathname];
    const lastPart = routeParts[resolvedPathname]?.params
      ? pathname.split("/").pop()
      : "";

    const index = routeArray?.findIndex((item) => item.route === pathname);

    if (resolvedRoutes) {
      resolvedRoutes["params"] = lastPart || "";
      resolvedRoutes["route"] = pathname;
    }

    //handle forward navigation
    if (resolvedRoutes && index === -1) {
      setRouteArray([...routeArray, resolvedRoutes as Route]);
    }

    //handle backward navigation
    if (resolvedRoutes && index !== -1) {
      const result = routeArray?.slice(0, index + 1);
      setRouteArray([...result]);
    }

    //handle navigation to the root directory
    if (resolvedRoutes && resolvedRoutes.isRoot) {
      setRouteArray([resolvedRoutes as Route]);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <div className={classNames(styles.wrapper, show ? "" : styles.hide)}>
      {showBack && (
        <div className={styles.back}>
          <img
            src={BackIcon}
            alt="BackIcon"
            onClick={() => navigate(-1)}
            className={styles.arrow} 
          />
          <p className={styles.element}>Go Back</p>
        </div>
      )}

      {routeArray?.map((item, index) => {
        return (
          <div key={item.route}>
            {index !== 0 &&
             <img
             src={ArrowSide}
             alt="ArrowSide"
             onClick={() => navigate(-1)}
             className={styles.arrow} 
           />
            }
            <p
              onClick={() => navigate(`${item.route}`)}
              className={styles.element}
            >
              {item?.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
