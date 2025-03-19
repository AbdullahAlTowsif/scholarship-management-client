import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ aplicationFees, scholarshipId, userName, userEmail, postedUserEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Fetch the payment intent client secret on component mount
    useEffect(() => {
        if (aplicationFees > 0) {
            axiosSecure
                .post("/api/create-payment-intent", { aplicationFees, scholarshipId })
                .then((res) => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch((error) => {
                    console.error("Error creating payment intent:", error);
                    toast.error("Failed to initialize payment.");
                });
        }
    }, [aplicationFees, axiosSecure, scholarshipId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            toast.error("Stripe has not been loaded yet.");
            setLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            toast.error("Card details are missing.");
            setLoading(false);
            return;
        }

        try {
            // Confirm Card Payment
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: userName,
                        email: userEmail,
                    },
                },
            });

            if (paymentResult.error) {
                toast.error(paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                toast.success("Payment successful!");

                // Send payment and enrollment data to backend
                const paymentData = {
                    scholarshipId,
                    transactionId: paymentResult.paymentIntent.id,
                    userName,
                    userEmail,
                    postedUserEmail,
                    aplicationFees,
                };

                await axiosSecure.post("/enroll/payments", paymentData);

                // Redirect to the enrolled classes page after successful payment
                // navigate("/dashboard/my-enroll-class");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 border rounded-lg">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button
                type="submit"
                className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${loading ? "opacity-50" : ""}`}
                disabled={!stripe || !clientSecret || loading}
            >
                {loading ? "Processing..." : `Pay $${aplicationFees}`}
            </button>
        </form>
    );
};

export default CheckoutForm;