import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { arrowLeftThick } from "react-icons-kit/typicons/arrowLeftThick";
import { arrowRightThick } from "react-icons-kit/typicons/arrowRightThick";

import { useSelector, useDispatch } from "react-redux";

const Form = () => {
  const user = useSelector((state) => state.currentUser.currentUser);
  const doctor = useSelector((state) => state.doctor.doctor);

  const [panicMedication, setPanicMedication] = React.useState("");
  const [progress, setProgress] = React.useState(1);
  const [physical, setPhysical] = React.useState(false);
  const [panic, setPanic] = React.useState(false);
  const [medication, setMedication] = React.useState(false);

  const [feeling, setFeeling] = React.useState("");
  console.log(feeling, "feeling");
  const [sleep, setSleep] = React.useState("");
  console.log(sleep, "sleep");

  const handleForm = (ev) => {
    ev.preventDefault();

    fetch(`/${user}/form`, {
      method: "POST",
      body: JSON.stringify({
        feeling: feeling,
        sleep: sleep,
        doctor: doctor,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          console.log("good");
        } else {
          console.log("something went wrong");
        }
      });
  };

  return (
    <Wrapper>
      <FormWrapper onSubmit={(ev) => handleForm(ev)}>
        {progress === 1 ? (
          <>
            <Label>
              How are you feeling on a scale from 1 to 10 (1 being the lowest,
              10 being the highest)
            </Label>
            <InputWrapper>
              <Label>1</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("1")}
                value={feeling}
              />
              <Label>2</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("2")}
                value={feeling}
              />
              <Label>3</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("3")}
                value={feeling}
              />
              <Label>4</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("4")}
                value={feeling}
              />
              <Label>5</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("5")}
                value={feeling}
              />
              <Label>6</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("6")}
                value={feeling}
              />
              <Label>7</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("7")}
                value={feeling}
              />
              <Label>8</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("8")}
                value={feeling}
              />
              <Label>9</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("9")}
                value={feeling}
              />
              <Label>10</Label>
              <Input
                type="radio"
                name="mood"
                onChange={(ev) => setFeeling("9")}
                value={feeling}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(2)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 2 ? (
          <>
            <Label>Hours of sleep</Label>
            <InputWrapper>
              <Input
                type="radio"
                name="sleep"
                value={sleep}
                onChange={(ev) => setSleep("3-6")}
              />
              <Label> 3-6 </Label>
              <Input
                type="radio"
                name="sleep"
                value={sleep}
                onChange={(ev) => setSleep("6-9")}
              />
              <Label> 6-9 </Label>
              <Input
                type="radio"
                name="sleep"
                value={sleep}
                onChange={(ev) => setSleep("9-12")}
              />
              <Label> 9-13 </Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(1)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(3)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 3 ? (
          <>
            <Label>Physical Activity?</Label>
            <InputWrapper>
              <Input
                type="radio"
                name="activity"
                value="yes"
                onClick={(ev) => setPhysical(true)}
              />
              <Label>yes</Label>
              <Input type="radio" name="activity" value="no" />
              <Label>no</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(2)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              {physical === true ? (
                <Button onClick={(ev) => setProgress(3.1)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              ) : (
                <Button onClick={(ev) => setProgress(4)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              )}
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 3.1 ? (
          <>
            <Label>Physical Activity</Label>
            <InputWrapper>
              <Input type="radio" name="activity" value="cardio" />
              <Label>cardio</Label>
              <Input type="radio" name="activity" value="yoga" />
              <Label>yoga</Label>
              <Input type="radio" name="activity" value="strength" />
              <Label>strength</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(3)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(4)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4 ? (
          <>
            <Label>Panic Attacks?</Label>
            <InputWrapper>
              <Input
                type="radio"
                name="panic"
                value="yes"
                onClick={(ev) => setPanic(true)}
              />
              <Label>yes</Label>
              <Input type="radio" name="panic" value="no" />
              <Label>no</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(3)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              {panic === true ? (
                <Button onClick={(ev) => setProgress(4.1)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              ) : (
                <Button onClick={(ev) => setProgress(5)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              )}
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4.1 ? (
          <>
            <Label>How Many?</Label>
            <InputWrapper>
              <Input type="radio" name="panic" value="1-2" />
              <Label>1</Label>
              <Input type="radio" name="panic" value="3-4" />
              <Label>2-3</Label>
              <Input type="radio" name="panic" value="more" />
              <Label>more</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(4.2)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4.2 ? (
          <>
            <Label>How would you rate them?</Label>
            <InputWrapper>
              <Input type="radio" name="panic" value="mild" />
              <Label>Mild</Label>
              <Input type="radio" name="panic" value="extreme" />
              <Label>Extreme</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4.1)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(4.3)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4.3 ? (
          <>
            <Label>
              Did you take any medication(pharmaceutical or recreational) to
              help?
            </Label>

            <InputWrapper>
              <Input
                type="radio"
                name="panic"
                value="took-medication"
                onClick={(ev) => setMedication(true)}
              />
              <Label>yes</Label>
              <Input type="radio" name="panic" value="no-medication" />
              <Label>no</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4.2)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              {medication === true ? (
                <Button onClick={(ev) => setProgress(4.4)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              ) : (
                <Button onClick={(ev) => setProgress(5)}>
                  <Icon size={24} icon={arrowRightThick} />
                </Button>
              )}
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4.4 ? (
          <>
            <Label>What did you take?</Label>
            <InputWrapper>
              <Input
                type="text"
                name="panic"
                value={panicMedication}
                onChange={(e) => setPanicMedication(e.target.value)}
              />
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4.3)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(4.5)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 4.5 ? (
          <>
            <Label>Was it helpful?</Label>
            <InputWrapper>
              <Input type="radio" name="panic" value="felt-better" />
              <Label>yes</Label>
              <Input type="radio" name="panic" value="felt-a-little-better" />
              <Label>kind of</Label>
              <Input type="radio" name="panic" value="didn't-feel-better" />
              <Label>felt the same</Label>
            </InputWrapper>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4.4)}>
                <Icon size={24} icon={arrowLeftThick} />
              </Button>
              <Button onClick={(ev) => setProgress(5)}>
                <Icon size={24} icon={arrowRightThick} />
              </Button>
            </ButtonWrapper>
          </>
        ) : null}
        {progress === 5 ? (
          <>
            <Button>submit answers</Button>
            <ButtonWrapper>
              <Button onClick={(ev) => setProgress(4.5)}></Button>

              <Icon size={24} icon={arrowLeftThick} />
            </ButtonWrapper>
          </>
        ) : null}
      </FormWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.form`
  margin-top: 100px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  border: 2px solid pink;
  border-radius: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Label = styled.label`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div``;

const Button = styled.button`
  font-size: 20px;
  border: none;
  background: white;

  &:hover {
    color: pink;
  }
`;
const Input = styled.input``;

export default Form;
