import { Form, Formik } from "formik";
import styles from "../styles.module.scss";
import { FC } from "react";
// import * as Yup from "yup";
import Input from "../../../../../../customs/input/input";
import Button from "../../../../../../customs/button/button";
import { useSetAtom } from "jotai";
import { LinkInfoAtom } from "../../../../../../utils/store";
import { LinkData } from "../../../../../../utils/type";

interface ComponentProps {
  handleClose: () => void;
  indexData:LinkData
}

const JobLinks: FC<ComponentProps> = ({indexData, handleClose }) => {
  const LinkAtomdata = useSetAtom(LinkInfoAtom);

  return (
    <section>
      <Formik
        initialValues={{
          type: indexData?.type || "",
          url: indexData?.url || "",
      
        }}
        enableReinitialize={true} 

        onSubmit={(values) => {
          const currentSkillInfo =
           JSON.parse(
            localStorage.getItem("link-data") ?? "[]"
          );
          if (indexData) {
            const updatedLinkInfo = currentSkillInfo?.map(
              (item: LinkData) =>
                item?.id === indexData?.id
                  ? { ...item, ...values }
                  : item
            );
            LinkAtomdata(updatedLinkInfo);
          } else {
            const updatedLinkInfo = [...currentSkillInfo, values];
            LinkAtomdata(updatedLinkInfo);
          }

          handleClose();
        }}
        // validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form>
              <div className={styles.inputContainer}>
                <Input
                  name="type"
                  label="Title"
                  placeholder="Title"
                  type="text"
                />
                  <Input
                  name="url"
                  label="Link"
                  placeholder="Link"
                  type="text"
                />

                <section className={styles.buttonGroup}>
                  <Button
                    variant="white"
                    type="submit"
                    disabled={false}
                    text="Cancel"
                    className={styles.btn}
                  />
                  <Button
                    variant="green"
                    type="submit"
                    disabled={false}
                    text="Save"
                    className={styles.btn}
                  />
                </section>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default JobLinks;
