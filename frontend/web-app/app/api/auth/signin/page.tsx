import EmptyFilter from "@/app/components/EmptyFilter";
import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES,
} from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      callbackUrl={searchParams.callbackUrl}
      title="You need to be logged in order to do that"
      subtitle="Please click below to sign in"
      showLogin
    />
  );
}
