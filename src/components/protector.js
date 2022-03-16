import { useEffect } from "react";
import { Hub } from "aws-amplify";
import { useRouter } from "next/router";
import { useCognitoUser } from "@Data/user";

export const Protector = ({ children }) => {
  const router = useRouter();
  const { data, mutate, error, loading } = useCognitoUser();

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event } }) => {
      switch (event) {
        case "signOut":
          mutate(null);
          // setUserGroups(null);
          router.push("/connect");
          break;
        case "signIn_failure":
          mutate(null);
          console.log("Sign in failure");
          break;
        default:
          break;
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    router.push("/connect");
    return null;
  }

  if (data) {
    return children || null;
  }
};

// export const Protector = ({ children }) => {
//   const user = userStore((state) => state.user);
//   const setUser = userStore((state) => state.setUser);

//   // const [user, setUser] = useState(null);
//   // const [userGroups, setUserGroups] = useState(null);
//   const router = useRouter();
//   const ok = useCognitoUser();

//   console.log("ok is ok", ok);

//   const getUser = () =>
//     Auth.currentAuthenticatedUser()
//       .then((userData) => userData)
//       .catch(() => console.log("Not signed in"));

//   useEffect(() => {
//     Hub.listen("auth", ({ payload: { event, data } }) => {
//       switch (event) {
//         case "signIn":
//           console.log(" someone got in");
//           getUser().then((userData) => {
//             setUser(userData);
//             // if (userData) {
//             //   setUserGroups(
//             //     userData.signInUserSession.accessToken.payload["cognito:groups"]
//             //   );
//             // }
//           });
//           break;
//         case "signOut":
//           setUser(null);
//           // setUserGroups(null);
//           router.push("/connect");
//           break;
//         case "signIn_failure":
//           setUser(null);
//           console.log("Sign in failure", data);
//           break;
//         default:
//           break;
//       }
//     });

//     Auth.currentAuthenticatedUser()
//       .then((u) => {
//         setUser(u);
//       })
//       // if there is no authenticated user, redirect to profile page
//       .catch(() => {
//         router.push("/connect");
//       });
//   }, []);

//   if (user) {
//     return children;
//   }

//   return null;
// };
