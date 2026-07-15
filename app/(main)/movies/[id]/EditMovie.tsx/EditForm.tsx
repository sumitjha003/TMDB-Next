"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Modal,
  ConfigProvider,
  theme,
  DatePicker,
  Select,
} from "antd";
import { useMutation, useQuery } from "@apollo/client/react";

import dayjs, { Dayjs } from "dayjs";

import { UPDATE_MOVIE } from "@/app/graphql/mutation";
import {
  GET_LANGUAGES,
  GET_MOVIE_BY_ID,
  GET_MOVIES,
} from "@/app/graphql/queries";

import type {
  MovieQuery,
  LanguagesQuery,
  LanguagesQueryVariables,
  UpdateMovieMutation,
  UpdateMovieMutationVariables,
} from "@/app/gql/graphql";

import { useNotification } from "@/app/context/Notification";
import LoadingPage from "../../loading";
import {
  Clapperboard,
  Calendar,
  Globe,
  Info,
  IndianRupee,
  Clock,
} from "lucide-react";

import { revalidateMovies } from "@/app/actions/revalidate";

const { TextArea } = Input;

type MovieFormValues = {
  title: string;
  releaseDate: Dayjs | null;
  adult: boolean;
  budget: number;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
};

type Language = {
  id: string;
  languageCode: string;
  englishName: string;
};

export default function EditMoviePage({
  movieId,
  onClose,
}: {
  movieId: string;
  onClose: () => void;
}) {
  const [form] = Form.useForm<MovieFormValues>();

  const id = movieId;
  const LIMIT = 8;

  const notification = useNotification();

  const PAGE_LIMIT = 1000;
  const [additionalLanguages, setAdditionalLanguages] = useState<Language[]>(
    []
  );
  const [skip, setSkip] = useState(PAGE_LIMIT);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    data,
    loading: movieLoading,
    error: movieError,
  } = useQuery<MovieQuery>(GET_MOVIE_BY_ID, {
    variables: { movieId: id },
    skip: !id,
    fetchPolicy: "network-only",
  });

  const {
    data: languagesData,
    loading: languagesLoading,
    fetchMore,
  } = useQuery<LanguagesQuery, LanguagesQueryVariables>(GET_LANGUAGES, {
    variables: { filter: { limit: PAGE_LIMIT, skip: 0 } },
    fetchPolicy: "network-only",
  });

  const initialLanguages = (languagesData?.languages?.data || [])
    .filter((lang): lang is NonNullable<typeof lang> => lang !== null)
    .map((lang) => ({
      id: lang.id || "",
      languageCode: lang.languageCode || "",
      englishName: lang.englishName || "",
    }));
  const allLanguages = [...initialLanguages, ...additionalLanguages];

  const loadMoreLanguages = () => {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    fetchMore({
      variables: { filter: { limit: PAGE_LIMIT, skip } },
    }).then((res) => {
      const newItems = (res.data?.languages?.data || [])
        .filter((lng): lng is NonNullable<typeof lng> => lng !== null)
        .map((lng) => ({
          id: lng.id || "",
          languageCode: lng.languageCode || "",
          englishName: lng.englishName || "",
        }));

      setAdditionalLanguages((prev) => [...prev, ...newItems]);
      setHasMore(newItems.length === PAGE_LIMIT);
      setSkip((prev) => prev + PAGE_LIMIT);
      setLoadingMore(false);
    });
  };

  // ... existing imports

  const [updateMovie, { loading: updateLoading }] = useMutation<
    UpdateMovieMutation,
    UpdateMovieMutationVariables
  >(UPDATE_MOVIE, {
    refetchQueries: [
      {
        query: GET_MOVIES,
        variables: {
          filter: { limit: LIMIT, skip: 0 },
          sort: {},
        },
      },
    ],

    onCompleted: async () => {
      await revalidateMovies();
      notification.success({
        title: "Movie updated successfully!",
        description: "Redirecting...",
        placement: "top",
      });
      setTimeout(() => onClose(), 500);
    },
    onError: (error) => {
      notification.error({
        title: "Error updating movie",
        description: error.message,
        placement: "top",
      });
    },
  });

  useEffect(() => {
    const movie = data?.movie?.data;
    if (!movie) return;
    const {
      title,
      originalTitle,
      releaseDate,
      adult,
      budget,
      revenue,
      runtime,
      originalLanguage,
      status,
      tagline,
      overview,
    } = movie;
    form.setFieldsValue({
      title: title ?? "",
      originalTitle: originalTitle ?? "",
      releaseDate: releaseDate ? dayjs(movie.releaseDate) : undefined,
      adult: adult ?? false,
      budget: budget ?? 0,
      revenue: revenue ?? 0,
      runtime: runtime ?? 0,
      originalLanguage: originalLanguage ?? "",
      status: status ?? "",
      tagline: tagline ?? "",
      overview: overview ?? "",
    });
  }, [data, form]);

  const onFinish = (values: MovieFormValues) => {
    const {
      title,
      originalTitle,
      releaseDate,
      adult,
      budget,
      revenue,
      runtime,
      status,
      tagline,
      overview,
      originalLanguage,
    } = values;
    updateMovie({
      variables: {
        updateMovieId: id,
        data: {
          title: title,
          originalTitle: originalTitle,
          releaseDate: releaseDate?.format("YYYY-MM-DD") || null,
          adult: adult,
          budget: budget,
          revenue: revenue,
          runtime: runtime,
          status: status,
          tagline: tagline,
          overview: overview,
          originalLanguage: originalLanguage,
        },
      },
    });
  };

  if (movieLoading) {
    return <LoadingPage />;
  }

  if (movieError) {
    return (
      <div className="p-6 text-red-600">
        Error loading movie: {movieError.message}
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#01B4E4",
          borderRadius: 16,
          colorBgContainer: "rgba(255, 255, 255, 0.05)",
          colorBorder: "rgba(255, 255, 255, 0.1)",
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
        <div className="bg-linear-to-br from-[#020617] via-[#020617] to-[#0f172a] overflow-hidden backdrop-blur-xl border border-white/10 shadow-2xl p-8 rounded-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-2xl bg-linear-to-br from-[#90CEA1] to-[#01B4E4] mb-6 shadow-lg shadow-cyan-500/30">
              <Clapperboard className="w-10 h-10 text-slate-900" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              Edit <span className="text-[#01B4E4]">Movie</span>
            </h1>
            <p className="text-slate-400 mt-3">Update movie details</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Item
                label={
                  <span className="text-slate-300 font-medium">
                    Movie Title
                  </span>
                }
                name="title"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<Clapperboard className="w-5 h-5 text-slate-500" />}
                  className="h-12 bg-white/5 border-white/10"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-slate-300 font-medium">
                    Original Title
                  </span>
                }
                name="originalTitle"
                rules={[{ required: true }]}
              >
                <Input className="h-12 bg-white/5 border-white/10" />
              </Form.Item>
            </div>

            <Form.Item
              label={
                <span className="text-slate-300 font-medium">Tagline</span>
              }
              name="tagline"
            >
              <Input className="h-12 bg-white/5 border-white/10" />
            </Form.Item>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-[#01B4E4] uppercase text-xs font-bold tracking-widest">
                  Financials
                </h3>
                <Form.Item
                  label={
                    <span className="text-slate-300 font-medium">Budget</span>
                  }
                  name="budget"
                >
                  <InputNumber
                    prefix={<IndianRupee className="w-4 h-4 text-slate-500" />}
                    className="w-full h-12 bg-white/5 border-white/10"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-slate-300 font-medium">Revenue</span>
                  }
                  name="revenue"
                >
                  <InputNumber
                    prefix={<IndianRupee className="w-4 h-4 text-slate-500" />}
                    className="w-full h-12 bg-white/5 border-white/10"
                    min={0}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-slate-300 font-medium">Adult?</span>
                  }
                  name="adult"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="space-y-6">
                <h3 className="text-[#01B4E4] uppercase text-xs font-bold tracking-widest">
                  Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label={
                      <span className="text-slate-300 font-medium">
                        Release Date
                      </span>
                    }
                    name="releaseDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      suffixIcon={
                        <Calendar className="w-5 h-5 text-slate-500" />
                      }
                      className="w-full h-12 bg-white/5 border-white/10"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="text-slate-300 font-medium">
                        Runtime (min)
                      </span>
                    }
                    name="runtime"
                  >
                    <InputNumber
                      prefix={<Clock className="w-5 h-5 text-slate-500" />}
                      className="w-full h-12 bg-white/5 border-white/10"
                      min={1}
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    label={
                      <span className="text-slate-300 font-medium">
                        Original Language
                      </span>
                    }
                    name="originalLanguage"
                    rules={[{ required: true }]}
                  >
                    <Select
                      loading={languagesLoading}
                      onPopupScroll={(e) => {
                        const target = e.target as HTMLDivElement;
                        if (
                          target.scrollTop + target.offsetHeight >=
                          target.scrollHeight - 10
                        ) {
                          loadMoreLanguages();
                        }
                      }}
                      suffixIcon={<Globe className="w-5 h-5 text-slate-500" />}
                      options={allLanguages.map((lang) => ({
                        label: lang.englishName,
                        value: lang.englishName,
                      }))}
                      className="h-12"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-slate-300 font-medium">Status</span>
                    }
                    name="status"
                  >
                    <Select
                      suffixIcon={<Info className="w-5 h-5 text-slate-500" />}
                      className="h-12"
                    >
                      <Select.Option value="Released">Released</Select.Option>
                      <Select.Option value="Pending">Pending</Select.Option>
                      <Select.Option value="Cancelled">Cancelled</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>

            <Form.Item
              label={
                <span className="text-slate-300 font-medium">Overview</span>
              }
              name="overview"
              className="mt-6"
            >
              <TextArea
                rows={5}
                className="bg-white/5 border-white/10 rounded-xl"
              />
            </Form.Item>

            <Form.Item className="mt-10 mb-0">
              <div className="flex justify-end gap-4">
                <Button onClick={onClose} className="px-8 h-12">
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateLoading}
                  className="h-14 px-12 rounded-2xl bg-linear-to-r from-[#3CBEC9] to-[#01B4E4] border-none font-bold text-slate-900 shadow-xl shadow-cyan-500/30"
                >
                  UPDATE MOVIE
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
