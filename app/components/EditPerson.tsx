"use client";

import React, { useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  ConfigProvider,
  theme,
  Modal,
} from "antd";
import { useMutation, useQuery } from "@apollo/client/react";
import dayjs, { Dayjs } from "dayjs";

import { GET_PERSON_BY_ID, LIST_PERSON } from "@/app/graphql/queries";
import { GenderType } from "@/app/gql/graphql";
import { useNotification } from "../context/Notification";
import { UPDATE_PERSON } from "../graphql/mutation";
import LoadingPage from "../(main)/movies/loading";
import { revalidatePerson } from "../actions/revalidate";

const { TextArea } = Input;
const { Option } = Select;

/* -------------------- helpers (same as ViewPerson) -------------------- */
const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const getGradient = (name: string) => {
  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-amber-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
};
/* --------------------------------------------------------------------- */

type PersonFormValues = {
  name: string;
  biography: string;
  birthday: Dayjs;
  gender: string;
  placeOfBirth: string;
  popularity: number;
  knownForDepartment: string;
  alsoKnownAs: (string | null | undefined)[];
  adult: boolean;
};

type EditPersonProps = {
  personId?: string;
  onClose: () => void;
  onSuccess?: () => void;
};

const EditPerson: React.FC<EditPersonProps> = ({
  personId,
  onClose,
  onSuccess,
}) => {
  const [form] = Form.useForm<PersonFormValues>();
  const notification = useNotification();

  const { data, loading, error } = useQuery(GET_PERSON_BY_ID, {
    variables: { personId: personId as string },
    skip: !personId,
    fetchPolicy: "network-only",
  });

  // ... existing imports

  const [updatePerson, { loading: updating }] = useMutation(UPDATE_PERSON, {
    refetchQueries: [
      { query: LIST_PERSON },
      { query: GET_PERSON_BY_ID, variables: { personId } },
    ],
    onCompleted: async () => {
      await revalidatePerson();
      notification.success({
        title: "Person updated successfully!",
        placement: "top",
      });
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    },
    onError: (err) =>
      notification.error({
        title: `Error: ${err.message}`,
        placement: "top",
      }),
  });

  const person = data?.person?.data;

  useEffect(() => {
    if (person) {
      form.setFieldsValue({
        name: person.name ?? "",
        biography: person.biography ?? "",
        birthday: person.birthday ? dayjs(person.birthday) : undefined,
        gender: person.gender ?? "",
        placeOfBirth: person.placeOfBirth ?? "",
        popularity: person.popularity ?? 0,
        knownForDepartment: person.knownForDepartment ?? "",
        alsoKnownAs: Array.isArray(person.alsoKnownAs)
          ? person.alsoKnownAs.filter(
              (a): a is string => a !== null && a !== undefined
            )
          : [],
        adult: person.adult ?? false,
      });
    }
  }, [person, form]);

  const onFinish = (values: PersonFormValues) => {
    if (!personId) return;

    updatePerson({
      variables: {
        updatePersonId: personId,
        data: {
          name: values.name,
          biography: values.biography,
          birthday: values.birthday?.format("YYYY-MM-DD"),
          gender: values.gender as GenderType,
          placeOfBirth: values.placeOfBirth,
          popularity: values.popularity,
          knownForDepartment: values.knownForDepartment,
          alsoKnownAs:
            values.alsoKnownAs?.filter((a): a is string => Boolean(a)) ?? [],
          adult: values.adult,
        },
      },
    });
  };

  if (loading) return <LoadingPage />;

  if (error || !person) {
    return (
      <div className="p-8 text-center text-white bg-[#0f172a] rounded-2xl">
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  const initials = getInitials(person.name || "?");
  const gradient = getGradient(person.name || "");

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#01B4E4",
          colorBgContainer: "#1e293b",
          colorBorder: "rgba(255,255,255,0.1)",
          borderRadius: 12,
        },
        components: {
          Modal: {
            contentBg: "transparent",
            boxShadow: "none",
          },
        },
      }}
    >
      <Modal
        open={true}
        footer={null}
        centered
        width={900}
        onCancel={onClose}
        closeIcon={null}
      >
        <div className="bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl relative">
          <div
            className={`absolute top-0 right-0 w-96 h-96  bg-linear-to-br from-[#1e293b] via-[#0f172a] to-[#020617] opacity-10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2`}
          />

          <div className="relative flex flex-col items-center text-center mb-10 z-10">
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br ${gradient} flex items-center justify-center shadow-[0_0_40px_rgba(1,180,228,0.2)] mb-4 ring-4 ring-[#0f172a] ring-offset-4 ring-offset-white/5`}
            >
              <span className="text-5xl md:text-6xl font-black text-white mix-blend-overlay opacity-80 select-none">
                {initials}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Edit {person.name}
            </h1>

            <p className="text-white/40 text-sm mt-2">
              Update personal details
            </p>
          </div>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4 relative z-10"
            requiredMark={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="name"
                label={
                  <span className="text-slate-300 font-medium">Full Name</span>
                }
                rules={[{ required: true }]}
              >
                <Input className="h-12 rounded-xl bg-white/5 border-white/10 text-white" />
              </Form.Item>

              <Form.Item
                name="alsoKnownAs"
                label={
                  <span className="text-slate-300 font-medium">Known As</span>
                }
              >
                <Select
                  mode="tags"
                  className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="biography"
              label={
                <span className="text-slate-300 font-medium">Biography</span>
              }
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                showCount
                maxLength={2000}
                className="bg-white/5 border-white/10 rounded-xl text-white"
              />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="birthday"
                label={
                  <span className="text-slate-300 font-medium">Birthday</span>
                }
              >
                <DatePicker
                  style={{ width: "100%" }}
                  className="h-12 bg-white/5 border-white/10 rounded-xl w-full"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label={
                  <span className="text-slate-300 font-medium">Gender</span>
                }
              >
                <Select className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!">
                  <Option value={GenderType.Male}>Male</Option>
                  <Option value={GenderType.Female}>Female</Option>
                  <Option value={GenderType.Other}>Other</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                name="placeOfBirth"
                label={
                  <span className="text-slate-300 font-medium">
                    Place of Birth
                  </span>
                }
              >
                <Input className="h-12 rounded-xl bg-white/5 border-white/10 text-white" />
              </Form.Item>

              <Form.Item
                name="popularity"
                label={
                  <span className="text-slate-300 font-medium">Popularity</span>
                }
              >
                <InputNumber
                  style={{ width: "100%" }}
                  className="h-12 bg-white/5 border-white/10 rounded-xl w-full flex items-center"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <Form.Item
                name="knownForDepartment"
                label={
                  <span className="text-slate-300 font-medium">Department</span>
                }
              >
                <Select className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!">
                  {[
                    "Acting",
                    "Directing",
                    "Writing",
                    "Production",
                    "Camera",
                    "Editing",
                  ].map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="adult"
                label={
                  <span className="text-slate-300 font-medium">
                    18+ Content
                  </span>
                }
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
              <Button
                onClick={onClose}
                htmlType="button"
                className="h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={updating}
                className="h-12 px-8 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 border-none font-bold shadow-lg shadow-blue-500/20"
              >
                Update Person
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default EditPerson;
