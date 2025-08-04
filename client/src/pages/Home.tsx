import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Input, Select, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/useToast";
import { improveText } from "../api/gemini";
import { formSchema, type formDataType } from "../types";

const options = [
  { value: "investor", label: "Investor" },
  { value: "market", label: "Market" },
  { value: "customer", label: "Customer" },
];

export default function Home() {
  const [loading, setLoading] = useState({
    problem: false,
    solution: false,
  });
  const [improvedProblem, setImprovedProblem] = useState("");
  const [improvedSolution, setImprovedSolution] = useState("");
  const navigate = useNavigate();
  const { contextHolder, showInfo, showError, showSuccess } = useToast();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      perspective: "investor",
      problem: improvedProblem,
      solution: improvedSolution,
    },
    mode: "onTouched",
  });

  const handleGenerate = (data: formDataType) => {
    navigate("/result", {
      state: {
        problem: data.problem,
        solution: data.solution,
        improvedProblem,
        improvedSolution,
        perspective: data.perspective,
      },
    });
  };

  const handleImprove = async (type: "problem" | "solution") => {
    const currentValues = getValues();
    const textToImprove =
      type === "problem" ? currentValues.problem : currentValues.solution;

    if (!textToImprove || textToImprove.length < 10) {
      showError(
        "Please enter a valid statement (at least 10 characters) before improving."
      );
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));

    try {
      showInfo(`Sending your ${type} statement to be refined. Please wait...`);

      const improved = await improveText(
        textToImprove,
        type,
        currentValues.perspective
      );

      if (type === "problem") {
        setImprovedProblem(improved);
        setValue("problem", improved, { shouldTouch: true });
      } else {
        setImprovedSolution(improved);
        setValue("solution", improved, { shouldTouch: true });
      }
      showSuccess(
        `${
          type[0].toUpperCase() + type.slice(1)
        } statement improved successfully.`
      );
    } catch (error) {
      console.error(`Failed to improve ${type}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        onFinish={handleSubmit(handleGenerate)}
        className="p-6 space-y-6"
        layout="vertical"
      >
        {/* Top section: Perspective + Generate button */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          {/* Investor type */}
          <Form.Item
            className="w-full md:w-2/3"
            label={<span className="font-medium">Perspective</span>}
            validateStatus={errors.perspective ? "error" : ""}
            help={errors.perspective?.message}
          >
            <Controller
              name="perspective"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Select a perspective"
                  className="w-full"
                />
              )}
            />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleSubmit(handleGenerate)}
            disabled={!isValid}
            className="w-full md:w-auto"
          >
            Generate Final View
          </Button>
        </div>

        {/* Problem Statement */}
        <Form.Item
          label={<span className="font-semibold">Problem Statement</span>}
          validateStatus={errors.problem ? "error" : ""}
          help={errors.problem?.message}
        >
          <Controller
            name="problem"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Describe the problem here..."
                className="w-full p-2 border rounded resize-none"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={() => handleImprove("problem")}
            className="px-4 py-2"
            loading={loading.problem}
            disabled={loading.problem}
          >
            {loading.problem ? "Improving..." : "Improve Problem"}
          </Button>
        </div>

        {/* Solution Statement */}
        <Form.Item
          label={<span className="font-medium">Solution Statement</span>}
          validateStatus={errors.solution ? "error" : ""}
          help={errors.solution?.message}
        >
          <Controller
            name="solution"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                placeholder="Describe the Solution here..."
                className="w-full p-2 border rounded resize-none"
              />
            )}
          />
        </Form.Item>

        <div className="flex justify-end">
          <Button
            type="primary"
            onClick={() => handleImprove("solution")}
            loading={loading.solution}
            disabled={loading.solution}
          >
            {loading.solution ? "Improving..." : "Improve Solution"}
          </Button>
        </div>
      </Form>
    </>
  );
}
