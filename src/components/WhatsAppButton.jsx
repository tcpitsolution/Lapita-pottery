import React from "react";
import {MessageCircle} from "lucide-react"; import {config} from "../config";
export default function WhatsAppButton(){ if(!config.whatsapp)return null; return <a className="wa" href={`https://wa.me/${config.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer"><MessageCircle/><span>Chat with us</span></a> }