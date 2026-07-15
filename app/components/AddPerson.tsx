"use client";

import React from "react";
import {
  Form,
  Input,
  Button,
  message,
  Select,
  DatePicker,
  InputNumber,
  Switch,
  Modal,
  ConfigProvider,
  theme,
} from "antd";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import type { Dayjs } from "dayjs";

import { LIST_PERSON } from "@/app/graphql/queries";

import { ROUTES } from "@/app/constants/routes";
import {
  GenderType,
  ListPersonsSortFields,
  SortOrder,
} from "@/app/gql/graphql";
import { CREATE_PERSON } from "../graphql/mutation";

import { revalidatePerson } from "../actions/revalidate";

const { TextArea } = Input;
const { Option } = Select;

type PersonFormValues = {
  name: string;
  biography: string;
  birthday: Dayjs;
  gender: GenderType;
  placeOfBirth: string;
  popularity: number;
  knownForDepartment: string;
  alsoKnownAs: string[];
  adult: boolean;
};

interface AddPersonPageProps {
  onClose?: () => void;
}

export default function AddPersonPage({ onClose }: AddPersonPageProps = {}) {
  const [form] = Form.useForm<PersonFormValues>();
  const router = useRouter();

  // ... imports

  const [createPerson, { loading }] = useMutation(CREATE_PERSON, {
    refetchQueries: [
      {
        query: LIST_PERSON,
        variables: {
          filter: { limit: 5, skip: 0, searchTerm: "" },
          sort: {
            field: ListPersonsSortFields.CreatedAt,
            order: SortOrder.Asc,
          },
        },
      },
    ],
    onCompleted: async () => {
      await revalidatePerson();
      message.success("Person created successfully!");
      if (onClose) {
        onClose();
      } else {
        router.push(ROUTES.PERSON);
      }
    },
    onError: (err: Error) => {
      console.error("Create person error:", err);
      message.error(`Error: ${err.message}`);
    },
  });

  const onFinish = (values: PersonFormValues) => {
    if (!values.birthday) {
      message.error("Please select birthday");
      return;
    }

    createPerson({
      variables: {
        data: {
          name: values.name,
          biography: values.biography,
          birthday: values.birthday.format("YYYY-MM-DD"),
          gender: values.gender,
          placeOfBirth: values.placeOfBirth,
          popularity: values.popularity,
          knownForDepartment: values.knownForDepartment,
          alsoKnownAs:
            values.alsoKnownAs?.filter((a): a is string => Boolean(a)) ?? [],
          adult: values.adult ?? false,
        },
      },
    });
  };

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
            className={`absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#1e293b] via-[#0f172a] to-[#020617] opacity-10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2`}
          />

          <div className="relative flex flex-col items-center text-center mb-10 z-10">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Create <span className="text-[#01B4E4]">Person</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">
              Add a new person to the database
            </p>
          </div>

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
                rules={[{ required: true, message: "Please enter name!" }]}
              >
                <Input
                  placeholder="Enter name"
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white"
                />
              </Form.Item>

              <Form.Item
                name="alsoKnownAs"
                label={
                  <span className="text-slate-300 font-medium">Known As</span>
                }
              >
                <Select
                  mode="tags"
                  placeholder="Enter other names"
                  className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="biography"
              label={
                <span className="text-slate-300 font-medium">Biography</span>
              }
              rules={[
                { required: true, message: "Please provide biography!" },
                { min: 20, message: "Must be at least 20 characters!" },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Enter biography..."
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
                rules={[{ required: true, message: "Please select birthday!" }]}
              >
                <DatePicker
                  className="h-12 bg-white/5 border-white/10 rounded-xl w-full"
                  format="MM/DD/YYYY"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label={
                  <span className="text-slate-300 font-medium">Gender</span>
                }
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  placeholder="Select gender"
                  className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!"
                >
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
                rules={[
                  { required: true, message: "Please enter place of birth!" },
                ]}
              >
                <Input
                  placeholder="Enter place of birth"
                  className="h-12 rounded-xl bg-white/5 border-white/10 text-white"
                />
              </Form.Item>

              <Form.Item
                name="popularity"
                label={
                  <span className="text-slate-300 font-medium">Popularity</span>
                }
                rules={[
                  { required: true, message: "Please enter popularity!" },
                ]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  step={0.1}
                  className="h-12 bg-white/5 border-white/10 rounded-xl w-full flex items-center"
                  placeholder="Enter popularity (0-100)"
                />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <Form.Item
                name="knownForDepartment"
                label={
                  <span className="text-slate-300 font-medium">Department</span>
                }
                rules={[
                  { required: true, message: "Please select department!" },
                ]}
              >
                <Select
                  placeholder="Select department"
                  className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-white/10! [&_.ant-select-selector]:rounded-xl!"
                >
                  <Option value="Acting">Acting</Option>
                  <Option value="Directing">Directing</Option>
                  <Option value="Writing">Writing</Option>
                  <Option value="Production">Production</Option>
                  <Option value="Camera">Camera</Option>
                  <Option value="Editing">Editing</Option>
                  <Option value="Sound">Sound</Option>
                  <Option value="Art">Art</Option>
                  <Option value="Costume & Make-Up">Costume & Make-Up</Option>
                  <Option value="Visual Effects">Visual Effects</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-slate-300 font-medium">
                    18+ Content
                  </span>
                }
                name="adult"
                valuePropName="checked"
              >
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            </div>

            <div className="flex gap-4 justify-end pt-6 border-t border-white/10">
              <Button
                onClick={() =>
                  onClose ? onClose() : router.push(ROUTES.PERSON)
                }
                htmlType="button"
                className="h-12 px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                loading={loading}
                className="h-12 px-8 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 border-none font-bold shadow-lg shadow-blue-500/20 text-white hover:text-white"
              >
                Create Person
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
