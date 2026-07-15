"use client";

import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Card,
  Select,
  DatePicker,
  ConfigProvider,
  theme,
} from "antd";
import type { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client/react";
import { useSession } from "next-auth/react";
import { CREATE_MOVIE } from "@/app/graphql/mutation";
import { GET_MOVIES, GET_LANGUAGES } from "@/app/graphql/queries";
import { LanguagesQuery } from "@/app/gql/graphql";
import { useNotification } from "@/app/context/Notification";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import LoginModal from "@/app/components/LoginModal";
import LoadingPage from "../loading";
import {
  Clapperboard,
  Calendar,
  Globe,
  Info,
  IndianRupee,
  Clock,
} from "lucide-react";
import { ROUTES } from "@/app/constants/routes";

const { TextArea } = Input;
const { Option } = Select;

type MovieFormValues = {
  title: string;
  originalTitle: string;
  releaseDate: Dayjs | null;
  adult: boolean;
  budget: number;
  revenue: number;
  runtime: number;
  originalLanguage: string;
  status: string;
  tagline: string;
  overview: string;
};

export default function CreateMovie() {
  const [form] = Form.useForm();
  const router = useRouter();
  const notification = useNotification();
  const { data: session, status } = useSession();

  const LIMIT = 3;

  const [createMovie, { loading }] = useMutation(CREATE_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
        variables: { filter: { limit: LIMIT, skip: 0 } },
      },
    ],
    onCompleted: () => {
      notification.success({
        title: "Movie created successfully!",
        description: "Redirecting to Movies list...",
        placement: "top",
      });
      setTimeout(() => router.push(ROUTES.MOVIES), 2000);
    },
    onError: (error) => {
      notification.error({
        title: "Failed to create movie",
        description: error.message || "Something went wrong",
        placement: "top",
      });
    },
  });

  const { data: languagesData, loading: languagesLoading } =
    useQuery<LanguagesQuery>(GET_LANGUAGES, {
      variables: { filter: { limit: 1000, skip: 0 } },
      fetchPolicy: "cache-first",
    });

  const languages =
    languagesData?.languages?.data
      ?.filter((l): l is NonNullable<typeof l> => !!l)
      .map((l) => ({
        label: l.englishName,
        value: l.languageCode,
      })) || [];

  if (status === "loading") return <LoadingPage />;

  if (!session)
    return (
      <>
        <LoadingPage />
        <LoginModal
          isOpen
          onClose={() => router.push(ROUTES.MOVIES)}
          message="To create a movie, you need to login first."
          callbackUrl={ROUTES.CREATE_MOVIE}
        />
      </>
    );

  const onFinish = (values: MovieFormValues) => {
    createMovie({
      variables: {
        data: {
          title: values.title,
          originalTitle: values.originalTitle,
          releaseDate: values.releaseDate?.format("YYYY-MM-DD"),
          adult: values.adult,
          budget: values.budget,
          revenue: values.revenue,
          runtime: values.runtime,
          originalLanguage: values.originalLanguage,
          status: values.status,
          tagline: values.tagline,
          overview: values.overview,
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
          borderRadius: 12,
          colorBgContainer: "transparent",
          colorBorder: "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <div className="min-h-screen bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] p-8 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 opacity-80">
            <Breadcrumbs />
          </div>

          <Card className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2rem shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="text-center mb-10 pt-6">
              <div className="inline-flex p-4 rounded-3xl bg-linear-to-br from-[#90CEA1] via-[#3CBEC9] to-[#01B4E4] mb-6 shadow-lg shadow-cyan-500/20">
                <Clapperboard className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-slate-200 to-slate-400 tracking-tight mb-3">
                Create New Movie
              </h1>
              <p className="text-slate-400 text-lg">
                Add a professional cinematic entry
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              requiredMark={false}
              className="premium-form px-4 pb-4"
            >
              {/* Row 1: Titles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Form.Item
                  label={
                    <span className="text-slate-400 font-medium">
                      Movie Title
                    </span>
                  }
                  name="title"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    prefix={
                      <Clapperboard className="w-4 h-4 mr-2 text-slate-500" />
                    }
                    placeholder="e.g. Inception"
                    className="h-14 bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] hover:bg-white/10 transition-all rounded-xl text-lg placeholder:text-slate-600"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-slate-400 font-medium">
                      Original Title
                    </span>
                  }
                  name="originalTitle"
                  rules={[{ required: true, message: "Required" }]}
                >
                  <Input
                    placeholder="Native title"
                    className="h-14 bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] hover:bg-white/10 transition-all rounded-xl text-lg placeholder:text-slate-600"
                  />
                </Form.Item>
              </div>

              {/* Row 2: Tagline */}
              <Form.Item
                label={
                  <span className="text-slate-400 font-medium">Tagline</span>
                }
                name="tagline"
                rules={[{ required: true, message: "Required" }]}
                className="mb-8"
              >
                <Input
                  placeholder="Enter a memorable tagline"
                  className="h-14 bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] hover:bg-white/10 transition-all rounded-xl text-lg placeholder:text-slate-600"
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Left Column: Financials & Rating */}
                <div className="space-y-6">
                  <h3 className="text-[#01B4E4] uppercase text-xs font-bold tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-[#01B4E4]"></span>
                    Financials
                  </h3>
                  <Form.Item
                    label={
                      <span className="text-slate-400 font-medium">Budget</span>
                    }
                    name="budget"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      prefix={
                        <IndianRupee className="w-4 h-4 text-slate-500" />
                      }
                      className="w-full h-12 flex items-center bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] rounded-xl overflow-hidden"
                      min={0}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-slate-400 font-medium">
                        Revenue
                      </span>
                    }
                    name="revenue"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      prefix={
                        <IndianRupee className="w-4 h-4 text-slate-500" />
                      }
                      className="w-full h-12 flex items-center bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] rounded-xl overflow-hidden"
                      min={0}
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-slate-400 font-medium">
                        Age Rating
                      </span>
                    }
                    name="adult"
                    valuePropName="checked"
                    initialValue={false}
                  >
                    <div className="flex items-center justify-between bg-white/5 border border-white/5 py-3 px-4 rounded-xl hover:bg-white/10 transition-colors">
                      <span className="text-slate-400 text-sm">
                        Is this intended for adult audiences?
                      </span>
                      <Switch checkedChildren="18+" unCheckedChildren="All" />
                    </div>
                  </Form.Item>
                </div>

                {/* Right Column: Metadata */}
                <div className="space-y-6">
                  <h3 className="text-[#01B4E4] uppercase text-xs font-bold tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-[#01B4E4]"></span>
                    Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                      label={
                        <span className="text-slate-400 font-medium">
                          Release Date
                        </span>
                      }
                      name="releaseDate"
                      rules={[{ required: true }]}
                    >
                      <DatePicker
                        suffixIcon={
                          <Calendar className="w-4 h-4 text-slate-500" />
                        }
                        className="w-full h-12 bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] rounded-xl hover:bg-white/10"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-slate-400 font-medium">
                          Runtime (min)
                        </span>
                      }
                      name="runtime"
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        prefix={<Clock className="w-4 h-4 text-slate-500" />}
                        className="w-full h-12 flex items-center bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] rounded-xl overflow-hidden"
                        min={1}
                      />
                    </Form.Item>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                      label={
                        <span className="text-slate-400 font-medium">
                          Language
                        </span>
                      }
                      name="originalLanguage"
                      rules={[{ required: true }]}
                    >
                      <Select
                        loading={languagesLoading}
                        showSearch
                        suffixIcon={
                          <Globe className="w-4 h-4 text-slate-500" />
                        }
                        className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-transparent! [&_.ant-select-selector]:hover!border-white/10 [&_.ant-select-selector]:rounded-xl!"
                        options={languages}
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <span className="text-slate-400 font-medium">
                          Status
                        </span>
                      }
                      name="status"
                      rules={[{ required: true }]}
                    >
                      <Select
                        suffixIcon={<Info className="w-4 h-4 text-slate-500" />}
                        className="h-12 [&_.ant-select-selector]:bg-white/5! [&_.ant-select-selector]:border-transparent! [&_.ant-select-selector]:hover!border-white/10 [&_.ant-select-selector]:rounded-xl!"
                      >
                        <Option value="Released">Released</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Cancelled">Cancelled</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* Row 4: Overview */}
              <Form.Item
                label={
                  <span className="text-slate-400 font-medium">Overview</span>
                }
                name="overview"
                rules={[{ required: true, message: "Required" }, { min: 10 }]}
                className="mt-8"
              >
                <TextArea
                  rows={4}
                  placeholder="Deep dive into the plot..."
                  className="bg-white/5 border-transparent hover:border-white/10 focus:border-[#01B4E4] rounded-xl text-lg placeholder:text-slate-600 hover:bg-white/10 transition-all p-4"
                />
              </Form.Item>

              
              <div className="flex items-center justify-end gap-6 pt-8 mt-8 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => router.push(ROUTES.MOVIES)}
                  className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-all"
                >
                  Discard
                </button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="h-14 px-12 rounded-2xl bg-linear-to-r from-[#3CBEC9] to-[#01B4E4] border-none font-bold text-white text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Create Movie
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </ConfigProvider>
  );
}
