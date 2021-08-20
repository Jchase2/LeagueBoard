import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/react";

interface Props {
    userRank: any
}

const Badges:React.FC<Props> = ({ userRank }) => {

    return (
      <>
        {userRank?.length && (
          <>
            {userRank[0].freshBlood ? (
              <Tooltip hasArrow label="This player is new to the game">
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  margin="5px"
                >
                  Fresh Blood
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                hasArrow
                label="This account was created over 1 year ago"
              >
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  margin="5px"
                >
                  Old Account
                </Button>
              </Tooltip>
            )}
            {userRank[0].hotStreak ? (
              <Tooltip hasArrow label="This player has won his last 3 games">
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  margin="5px"
                >
                  Hot Streak
                </Button>
              </Tooltip>
            ) : (
              <Tooltip hasArrow label="This player has lost his last 3 games">
                <Button
                  size="xs"
                  colorScheme="red"
                  variant="solid"
                  margin="5px"
                >
                  Losing Streak
                </Button>
              </Tooltip>
            )}
            {userRank[0].inactive ? (
              <Tooltip hasArrow label="This player is currently inactive">
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  margin="5px"
                >
                  Inactive
                </Button>
              </Tooltip>
            ) : (
              <Tooltip hasArrow label="This player is currently active">
                <Button
                  size="xs"
                  colorScheme="green"
                  variant="solid"
                  margin="5px"
                >
                  Active
                </Button>
              </Tooltip>
            )}
            {userRank[0].veteran ? (
              <Tooltip
                hasArrow
                label="This player has more than 100 games played this season"
              >
                <Button
                  size="xs"
                  colorScheme="teal"
                  variant="solid"
                  margin="5px"
                >
                  Solid Player
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                hasArrow
                label="This player has less than 100 games played this season"
              >
                <Button
                  size="xs"
                  colorScheme="red"
                  variant="solid"
                  margin="5px"
                >
                  Risky Player
                </Button>
              </Tooltip>
            )}
          </>
        )}
      </>
    );
}

export default Badges
