// import { useHistory } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { IUser } from '../../interfaces/User'


// import {
//   Flex,
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Button,
//   Image,
//   useColorModeValue,
// } from "@chakra-ui/react";

// const Login = () => {

//     const [loginData, setLoginData] = useState<IUser>({
//         email: "",
//         password: "",
//         confirmPassword: "",
//         regionId: 0,
//         summonerName: "",
//       });

//   const handleSubmit = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//   };

//   const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
//   };

//   return (
//     <Flex
//       minH="100vh"
//       align="center"
//       justifyContent="center"
//       flexDirection="column"
//       bg={useColorModeValue("gray.100", "gray.900")}
//     >
//       <Image src="lol.svg" alt="Logo" mb={6} mt={6} />
//       <Box
//         p={8}
//         borderWidth={1}
//         borderRadius={8}
//         boxShadow="lg"
//         minW="35vw"
//         bg={useColorModeValue("white", "gray.800")}
//         marginBottom="20px"
//       >
//         <Box textAlign="center">
//           <Heading>Register</Heading>
//         </Box>
//         <Box textAlign="left">
//           <form onSubmit={handleSubmit}>
//             <FormControl>
//               <FormLabel> Email </FormLabel>
//               <Input
//                 type="email"
//                 value={formData.email || ""}
//                 name="email"
//                 size="lg"
//                 onChange={handleChange}
//               />
//             </FormControl>
//             <FormControl isRequired mt={4}>
//               <FormLabel> Password </FormLabel>
//               <Input
//                 type="password"
//                 name="password"
//                 value={formData.password || ""}
//                 onChange={handleChange}
//                 size="lg"
//               />
//             </FormControl>
//             <Button
//               variantcolor="teal"
//               variant="outline"
//               width="full"
//               mt={4}
//               type="submit"
//             >
//               Login
//             </Button>
//           </form>
//         </Box>
//       </Box>
//     </Flex>
//   );
// };

// export default Login;
export {}