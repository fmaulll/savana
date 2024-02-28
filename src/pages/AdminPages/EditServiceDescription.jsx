import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import ReactQuill from "react-quill";
import { useParams, useNavigate } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const EditServiceDescription = () => {
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [serviceDetail, setServiceDetail] = useState({ name: "" });

  const getServiceDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("name")
      .eq("id", id)
      .single();
    if (data) {
      setServiceDetail({ name: data.name });
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .update({ description: description })
      .eq("id", id);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    navigate(-1);
  };

  const getDescription = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      setDescription(data.description);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDescription();
    getServiceDetail();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      {!serviceDetail || (!serviceDetail.name) ? (
        ""
      ) : (
        <div className="w-full font-bold text-2xl">{type !== "about" && serviceDetail.name}</div>
      )}
      <div className="flex justify-end mt-4">
        <Button type="orange">Publish</Button>
      </div>
      <ReactQuill
        className="mt-4 mb-10"
        placeholder="Penjelasan Proyek"
        theme="snow"
        value={description}
        onChange={(e) => setDescription(e)}
      />
    </form>
  );
};

export default EditServiceDescription;
