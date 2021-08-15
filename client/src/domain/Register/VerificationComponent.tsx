import { useState, useEffect } from "react";
import { getVerifyInfo } from '../../api/backendApi';

// Declaring type of props - see "Typing Component Props" for more examples
type RegisterUserProps = {
  regionId: number;
  summonerName: string;
};

const VerificationComponent = (props: RegisterUserProps) => {
  const [iconLinkArr, setIconLinkArr] = useState<string[]>([]);


//COME FROM RegisterScreen
//props --> {signup fields}
//Enter this component call verifyInfo with Summoner and RegionId
//verifyInfo returns ---> iconId and the puuid.
//puuid needs to be added to signup fields
// iconId added to the setIconLink

//Ask user to change icon, when button clicked call verifyInfo again and add iconId to iconLink.
//Check if iconLink[0] === iconLink[1] and iconLink[0] !== defaultIconId
//if true call signup request
//else  cancel thesis
//if icon is already the default, repeat register and change icon before registering

  useEffect(() => {
    getVerifyInfo(props.regionId, props.summonerName).then((res) => {
      if(res.status === 200){
        setIconLinkArr([...iconLinkArr, res.iconId])
      }
    });
  });



  const handleSubmit = (e: any) => {
    e.preventDefault();

  };

  return (
    <p></p>
  );
};

export default VerificationComponent;
